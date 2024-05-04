import logger from "../utils/logger";

const asyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return Promise.resolve(fn(...args)).catch((error: any) => {
      logger.error(error);
      throw error;
    }) as Promise<ReturnType<T>>;
  };
};

export default asyncHandler;
