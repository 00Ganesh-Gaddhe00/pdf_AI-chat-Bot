declare module "byte-size" {
    interface ByteSizeResult {
      value: number;
      unit: string;
      long: string;
      toString: () => string;
    }
  
    function byteSize(
      bytes: number,
      options?: {
        precision?: number;
        units?: 'metric' | 'iec';
        customUnits?: { [key: string]: string };
        locale?: boolean | string;
      }
    ): ByteSizeResult;
  
    export default byteSize;
  }