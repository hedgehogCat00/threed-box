import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}

  /**
   * 生成UUID，算法参照 https://www.cnblogs.com/goloving/p/13853524.html
   *
   * @returns uuid
   */
  genUUID() {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  }
}
