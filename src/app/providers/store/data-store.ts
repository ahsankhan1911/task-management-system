const store: { [key: string]: Array<any> } = {};
type Newable<T> = { new (...args: any): T; };

export class DataStore {
  /**
   * @name insert
   * @description Inserts new document to collection
   * @param Model 
   * @param data 
   * @returns Document
   */
  public static insert<T>(Model: Newable<T>, data: T): T {

    let collection = store[Model.name];

    if (!collection) {
      collection = [];
      store[Model.name] = collection;
    }

    const instance = new Model();

    collection.unshift({ ...instance, ...data });

    console.log(JSON.stringify(store));

    return collection[0];
  }

  /**
   * @name update
   * @description update collection document by id
   * @param Model 
   * @param id 
   * @param updated 
   * @returns Updated Document
   */
  public static update<T>(Model: Newable<T>, id: string, updated: T): T | undefined {
    let collection = store[Model.name];

    if (collection) {
      const currentIndex = collection.findIndex(obj => obj.id === id);

      if (currentIndex === -1) {
        return;
      }

      const old = collection[currentIndex];
  
      collection[currentIndex] = { ...old, ...updated };

      return collection[currentIndex];
    }
  }

  /**
   * @name delete
   * @description Deletes a document by id
   * @param Model 
   * @param id 
   * @returns Deleted Document
   */
  public static delete<T>(Model: Newable<T>, id: string): T | undefined {
    let collection = store[Model.name];

    if (collection) {
      const currentIndex = collection.findIndex(obj => obj.id === id);

      if (!currentIndex) {
        return;
      }

      return collection.splice(currentIndex, 1).pop();
    }
  }

  /**
   * @name findAll
   * @description Finds all documents in a collection by query
   * @param Model 
   * @param query 
   * @returns Array<Document>
   */
  public static findAll<T>(Model: Newable<T>, query?: any): Array<T> {
    let collection = store[Model.name];

    if (collection) {
      if (query) {
        return collection.filter( (data) => {
          let exists: boolean = false;
          const keys = Object.keys(query);

          let nonExists: Array<boolean> = [];

          for (const key of keys) {
            exists = data[key] === query[key];

            if (!exists) {
              nonExists.push(exists);
            }
          }

          if (nonExists.length) {
            exists = false;
          }

          return exists;
      
        });
      }

      return collection;
    }

    return [];
  }

  /**
   * @name findById
   * @description Finds a document by id
   * @param Model 
   * @param id 
   * @returns Document
   */
  public static findById<T>(Model: Newable<T>, id: string): T | undefined {
    let collection = store[Model.name];

    if (collection) {
      const currentIndex = collection.findIndex(obj => obj.id === id);

      return collection[currentIndex];
    }
  }

  public static find<T>(Model: Newable<T>, query: any): T | undefined {
    let collection = store[Model.name];

    if (collection) {
      if (query) {
        return collection.find( (data) => {
          let exists: boolean = false;
          const keys = Object.keys(query);

          for (const key of keys) {
            exists = data[key] === query[key];
          }

          return exists;
      
        });
      }
    }
  }
}