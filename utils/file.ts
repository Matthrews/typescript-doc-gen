const fs = require("fs");

const file = {
  /**
   * read data from database
   * @param path database's path
   * @returns {Promise<unknown>}
   */
  read(path) {
    return new Promise((resolve, reject) => {
      // 异步Promise的经典操作，异步操作不能return
      fs.readFile(
        path,
        { encoding: "UTF-8", flag: "a+" },
        (error, contents) => {
          if (error) return reject(error);
          let list;
          try {
            list = JSON.parse(contents);
          } catch (err) {
            list = [];
          }
          resolve(list);
        }
      );
    });
  },
  /**
   * write data to database
   * @param list todo list
   * @param path database's path
   * @returns {Promise<unknown>}
   */
  write(list, path) {
    return new Promise<void>((resolve, reject) => {
      const str = JSON.stringify(list);
      fs.writeFile(path, str, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = file;
