import * as firebase from 'firebase';
import 'firebase/database';
import URL from 'url';
import {Shrinker} from "lib/Shrinker";

export default class Firebase {
  constructor(config) {
    this.fb = firebase.initializeApp(config);
    this.db = firebase.database();
    this.prefix = "sh-nk.me/";
    this.shrinker = new Shrinker();
  }

  /**
   * @desc returns deleted IDs from Firebase that are available to store
   * @returns Promise on completion,
   */
  retrieveDeleted = () => {
    return new Promise((resolve) => {
      let deletedID;
      this.db.ref('deleted').transaction((deletedIDs) => {
        if (deletedIDs) {
          deletedID = deletedIDs.shift();
        }
        return deletedIDs;
      }, (error, committed, snapshot) => {
        if (error) {
          resolve(null);
        } else if (committed) {
          resolve(deletedID);
        } else {
          resolve(null);
        }
      });
    });
  };

  /**
   * @param url: String
   * @returns Promise
   */
  shrink = (url) => {
    return new Promise((resolve, reject) => {
      let deleteTime = new Date(new Date().setDate(new Date().getDate() + 1));
      this.db.ref('urls').once('value', (snapshot) => {
          this.retrieveDeleted().then((deletedID) => {
            if (deletedID) {
              let shortUrl = this.prefix + this.shrinker.encode(deletedID);
              this.db.ref(`urls/${deletedID}`).set({'url': url, 'deleteTime': deleteTime});
              resolve(shortUrl);
            } else {
              if (snapshot) {
                let shortUrl = this.prefix + this.shrinker.encode(snapshot.numChildren());
                this.db.ref(`urls/${snapshot.numChildren()}`).set({'url': url, 'deleteTime': deleteTime});
                resolve(shortUrl);
              } else {
                let shortUrl = this.prefix + this.shrinker.encode(0);
                this.db.ref(`urls/0`).set({'url': url, 'deleteTime': deleteTime});
                resolve(shortUrl);
              }
            }
          })
      });
    });
  };

  expand = (code) => {
    let url;
    let id = this.shrinker.decode(code);
    return new Promise((resolve, reject) => {
      this.db.ref(`urls/${id}`).once('value', (snapshot) => {
        if (snapshot.val() && snapshot.val().url) {
          url = snapshot.val().url;
          if (!url.includes('http://') || !url.includes('https://')) {
            url = `https://${url}`;
          }
          try {
            new URL(url);
            resolve(url);
          } catch (err) {
            reject(null)
          }
        } else {
          reject(null);
        }
      });
    });
  };
}