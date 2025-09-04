// Resource Pattern para Suspense de dados assíncronos
export function createResource<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  let error: any;

  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      error = e;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result;
    }
  };
}
