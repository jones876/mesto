export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
      this._userNameSelector = userNameSelector;
      this._userInfoSelectort = userInfoSelector;
  }


  getUserInfo() {
    return {
        name: this._userNameSelector.textContent,
        about: this._userInfoSelectort.textContent
    };
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userInfoSelectort.textContent = data.about;
  }
}
