export class util {
  static getPhoto(buffer: Buffer<ArrayBufferLike>) {
    const base64Photo = buffer.toString('base64');
    let photoBase64 = `data:image/jpeg;base64,${base64Photo}`;
    return photoBase64;
  }

  static transformPhotos(entity: any): any {
    if (!entity) return entity;
  
  
    if (entity.photo && Buffer.isBuffer(entity.photo)) {
      entity.photo = util.getPhoto(entity.photo);
    }
    if (entity.profileImgUrl && Buffer.isBuffer(entity.profileImgUrl)) {
      entity.profileImgUrl = util.getPhoto(entity.profileImgUrl);
    }
  
    for (const key in entity) {
      if (Array.isArray(entity[key])) {
        entity[key] = entity[key].map((item) => util.transformPhotos(item));
      } else if (typeof entity[key] === 'object' && entity[key] !== null) {
        entity[key] = util.transformPhotos(entity[key]);
      }
    }
  
    return entity;
  }
  
  
}
