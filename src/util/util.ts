export class util {
  static getPhoto(buffer: Buffer<ArrayBufferLike>) {
    const base64Photo = buffer.toString('base64');
    let photoBase64 = `data:image/jpeg;base64,${base64Photo}`;
    return photoBase64;
  }

  static transformPhotos(entity: any): any {
    console.log(entity);
    if (!entity) return entity;
  
    if (entity.photo) {
      console.log('Photo exists:', entity.photo);
      console.log('Is Buffer:', Buffer.isBuffer(entity.photo));
    }
    if (entity.profileImgUrl) {
      console.log('ProfileImgUrl exists:', entity.profileImgUrl);
      console.log('Is Buffer:', Buffer.isBuffer(entity.profileImgUrl));
    }
  
    if (entity.photo && Buffer.isBuffer(entity.photo)) {
      console.log('Transforming photo');
      entity.photo = util.getPhoto(entity.photo);
    }
    if (entity.profileImgUrl && Buffer.isBuffer(entity.profileImgUrl)) {
      console.log('Transforming profileImgUrl');
      entity.profileImgUrl = util.getPhoto(entity.profileImgUrl);
    }
  
    for (const key in entity) {
      console.log('key', key);
      if (Array.isArray(entity[key])) {
        console.log('array ', key);
        entity[key] = entity[key].map((item) => util.transformPhotos(item)); // Preserve context here
      } else if (typeof entity[key] === 'object' && entity[key] !== null) {
        console.log('nested', key);
        entity[key] = util.transformPhotos(entity[key]); // Preserve context here
      }
    }
  
    return entity;
  }
  
  
}
