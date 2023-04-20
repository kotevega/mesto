export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._userName = document.querySelector(this._nameSelector);
    this._userJob = document.querySelector(this._jobSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.occupation = this._userJob.textContent;
    return this._userData;
  }

  setUserInfo(formData) {
    this._userName.textContent = formData.name;
    this._userJob.textContent = formData.occupation;
  }
}
