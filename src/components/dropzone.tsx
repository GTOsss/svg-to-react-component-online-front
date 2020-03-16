/* eslint-disable max-len */
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import Checkbox from '@components/checkbox';
import { NotificationManager } from 'react-notifications';
import Input from '@components/input';

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const Dnd = styled.div`
  padding: 100px 50px;
  border: 4px dashed #e0e0e0;
  text-align: center;
  font-size: 30px;
  font-family: Geometria, sans-serif;
  font-weight: 400;
  background-color: #f1f1f1;
  color: #9e9e9e;
  cursor: pointer;
`;

interface ISubmit {
  theme: 'primary' | 'secondary';
  disabled: boolean;
}

const mapTheme = {
  backgroundColor: {
    primary: '#05D69E',
    secondary: '#337ed6',
  },
};

const disabledSubmit = css`
  background-color: #d0d0d0;
  cursor: default;
`;

const Submit = styled.a<ISubmit>`
  background-color: ${({ theme }) => mapTheme.backgroundColor[theme]};
  text-decoration: none;
  border: none;
  padding: 25px 20px;
  margin: 20px auto;
  cursor: pointer;
  font-family: Geometria, sans-serif;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 520px;
  
  ${({ disabled }) => disabled && disabledSubmit}
`;

interface IIconArrows {
  arrowsUp: boolean;
  visible: boolean;
}

const IconArrows = styled.svg<IIconArrows>`
  margin: 0 20px;
  transform: rotateZ(${({ arrowsUp }) => (arrowsUp ? '180deg' : '0deg')});
  visibility: ${({ visible }) => (visible ? 'visibility' : 'hidden')};
`;

const Settings = styled.div`
  display: flex;
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  flex: 1 1 100px;
`;

interface IProps {
  arrowsUp: boolean;
  visible: boolean;
}

const Arrows = ({ arrowsUp, visible }: IProps) => (
  <IconArrows
    visible={visible}
    arrowsUp={arrowsUp}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 310 370"
    height="40px"
    width="40px"
  >
    <path
      fill="white"
      d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
    />
    <path
      style={{ transform: 'translateY(120px)' }}
      fill="white"
      d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
    />
  </IconArrows>
);

const Previews = () => {
  const [files, setFiles] = React.useState([]);
  const [downloadPath, setDownloadPath] = React.useState('');
  const [pending, setPending] = React.useState(false);
  const [pluginsMap, setPluginsMap] = React.useState({
    '@svgr/plugin-svgo': true,
    '@svgr/plugin-jsx': true,
    '@svgr/plugin-prettier': true,
  });
  const [settings, setSettings] = React.useState({
    icon: false,
    native: false,
    dimensions: false,
    ref: false,
    memo: false,
    ext: 'js',
  });

  React.useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.svg',
    onDrop,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData();

    files.map((el) => formData.append('images', el));
    const plugins = [];
    Object.entries(pluginsMap).forEach(([key, value]) => (value ? plugins.push(key) : null));
    formData.append('plugins', JSON.stringify(plugins));
    formData.append('settings', JSON.stringify({
      ...settings, dimensions: !settings.dimensions,
    }));

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.status > 400) {
        const responseBody = await response.json();
        NotificationManager.error(`${responseBody.err}\nTry change settings.`, 'Error', 60000);
      }
      const result = await response.json();
      setDownloadPath(result.path);
      NotificationManager.success(
        'The files were successfully converted! Now you can download them.', 'Success', 10000,
      );
    } catch (error) {
      console.error(error);
    }
    setPending(false);
  };

  const resetDownload = () => {
    setDownloadPath('');
  };

  const onChangePlugins = (name) => () => {
    resetDownload();
    setPluginsMap({ ...pluginsMap, [name]: !pluginsMap[name] });
  };

  const onChangeSettings = (name) => (value) => {
    resetDownload();
    setSettings({ ...settings, [name]: value });
  };

  const submitDisabled = !(files && files.length) || pending;
  const isDownload = downloadPath;

  let buttonText = isDownload ? 'Download' : 'Upload and transform';
  buttonText = pending ? 'Pending...' : buttonText;

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="icon"
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Dnd>Drag and drop some files here, or click to select files</Dnd>
      </div>

      <div style={thumbsContainer}>
        {thumbs}
      </div>

      <Settings>
        <SettingsSection>
          <Checkbox
            onChange={onChangePlugins('@svgr/plugin-svgo')}
            name="@svgr/plugin-svgo"
            value={pluginsMap['@svgr/plugin-svgo']}
          >
            Optimize (@svgr/plugin-svgo)
          </Checkbox>
          <Checkbox
            onChange={onChangePlugins('@svgr/plugin-prettier')}
            name="@svgr/plugin-prettier"
            value={pluginsMap['@svgr/plugin-prettier']}
          >
            Prettier (@svgr/plugin-prettier)
          </Checkbox>
          <Checkbox
            name="icon"
            value={settings.icon}
            onChange={onChangeSettings('icon')}
          >
            Icon
          </Checkbox>
        </SettingsSection>

        <SettingsSection>
          <Checkbox
            name="dimensions"
            value={settings.dimensions}
            onChange={onChangeSettings('dimensions')}
          >
            Remove width and height
          </Checkbox>
          <Checkbox
            name="memo"
            value={settings.memo}
            onChange={onChangeSettings('memo')}
          >
            Memo
          </Checkbox>
          <Checkbox
            name="ref"
            value={settings.ref}
            onChange={onChangeSettings('ref')}
          >
            Ref
          </Checkbox>
        </SettingsSection>

        <SettingsSection>
          <Checkbox
            name="native"
            value={settings.native}
            onChange={onChangeSettings('native')}
          >
            React native
          </Checkbox>
          <Input
            name="ext"
            inputWidth="100px"
            value={settings.ext}
            onChange={onChangeSettings('ext')}
          >
            File extension
          </Input>
        </SettingsSection>
      </Settings>

      <Submit
        download={Boolean(downloadPath && !submitDisabled)}
        href={downloadPath || '#'}
        disabled={submitDisabled}
        onClick={!downloadPath && !submitDisabled ? onSubmit : null}
        theme={!isDownload ? 'primary' : 'secondary'}
      >
        <Arrows visible={!submitDisabled} arrowsUp={!isDownload} />
        {buttonText}
        <Arrows visible={!submitDisabled} arrowsUp={!isDownload} />
      </Submit>
    </div>
  );
};

export default Previews;
