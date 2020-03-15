import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

type scrollHandler = (scrollTop?: number) => void;

/**
 * Вернет обработчик для scroll. Небходимо передать коллбеки на обработку скролла вверх и вниз.
 * @param upScrollHandlerCallback
 * @param downScrollHandlerCallback
 * @param timeout throttle timeout.
 * @param isDebounce По умолчанию throttle, но если передать true, будет использован debounce
 */
export const createScrollDirectionHandler = (
  upScrollHandlerCallback?: scrollHandler,
  downScrollHandlerCallback?: scrollHandler,
  timeout?: number,
  isDebounce?: boolean,
) => {
  let lastScrollTop = 0;

  const delayMethod = isDebounce ? debounce : throttle;

  return delayMethod(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if ((scrollTop > lastScrollTop) && downScrollHandlerCallback) {
      downScrollHandlerCallback(scrollTop);
    } else if ((scrollTop < lastScrollTop) && upScrollHandlerCallback) {
      upScrollHandlerCallback(scrollTop);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, timeout, isDebounce ? null : { trailing: true, leading: true });
};


export const getScrollHeight = () => {
  const { body, documentElement } = document;

  return Math.max(
    body.scrollHeight,
    documentElement.scrollHeight,
    body.offsetHeight,
    documentElement.offsetHeight,
    body.clientHeight,
    documentElement.clientHeight,
  );
};

export const getMaxScrollPosition = () => {
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return getScrollHeight() - vh;
};
