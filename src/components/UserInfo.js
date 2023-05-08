export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._nameSelector.textContent;
    this._userData.about = this._jobSelector.textContent;
    return this._userData;
  }

  setUserInfo(formData) {
    if (formData.name) {
      this._nameSelector.textContent = formData?.name;
    }
    if (formData.about) {
      this._jobSelector.textContent = formData?.about;
    }
  }

  setUserAvatar(formData) {
    if (formData.avatar) {
      this._avatarSelector.src = formData?.avatar;
    }
  }
}
