import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getoauth, register, getUserInfo } from '@/api/user'
import store from '@/store'

import Cookies from "js-cookie"
// User
const tokenKey = "token"
const getToken = () => Cookies.get(tokenKey)
var inFifteenMinutes= new Date(new Date().getTime()+ 24 * 60 * 60 * 1000)
const setToken = (token: string) => Cookies.set(tokenKey, token, {expires: inFifteenMinutes})
const removeToken = () => Cookies.remove(tokenKey)

export interface IUserState {
  loggedType: string;
  islogin: boolean;
  token: string;
  autograph: string;
  avatar: string;
  company: string;
  job: string;
  author: string;
  username: string;
  userInfo: object;
}
export interface IRegister {
  username: string
  author: string
  code: string
  password: string
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public loggedType = "register";
  public islogin = false;
  public token = getToken() || "";
  public autograph = "";
  public avatar = "";
  public company = "";
  public job = "";
  public author = "";
  public username = "";
  public userInfo = {};

  @Mutation
  private SET_LoggedType(loggedType: string) {
    this.loggedType = loggedType;
  }

  @Mutation
  private SET_Login(islogin: boolean) {
    this.islogin = islogin;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_AUTOGRAPH(autograph: string) {
    this.autograph = autograph;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }
  @Mutation
  private SET_UserInfo(userInfo: object) {
    this.userInfo = userInfo;
  }
  @Mutation
  private SET_COMPANY(company: string) {
    this.company = company;
  }
  @Mutation
  private SET_JOB(job: string) {
    this.job = job;
  }
  @Mutation
  private SET_NICKNAME(author: string) {
    this.author = author;
  }
  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    username = username.trim();
    try {
      const { data } = await login({ username, password });
      setToken(data.accessToken);
      this.SET_TOKEN(data.accessToken);
      this.SET_Login(false);
      return data
    } catch (error) {
      return error;
    }
  }
  @Action
  public async ResetToken(user: {author: string}) {
    const {author} = user
    removeToken();
    this.SET_TOKEN("");
    await logout({author})
  }
  @Action
  public async oauthLogin(code: string) {
    const { data } = await getoauth({ code });
    setToken(data.accessToken);
    this.SET_TOKEN(data.accessToken);
    this.SET_Login(false);
    return true;
  }

  @Action async Register(userInfo: IRegister) {
    try {
      const { data } = await register(userInfo);
      if (data) {
        setToken(data.accessToken);
        this.SET_TOKEN(data.accessToken);
        this.SET_Login(false);
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  @Action
  public handleLoggedType(params: string) {
    this.SET_LoggedType(params);
  }

  @Action
  public handleIslogin(params: boolean) {
    this.SET_Login(params);
  }

  @Action
  public async GetUserInfo() {
    const { data } = await getUserInfo();
    if (!data) {
      throw Error("Verification failed, please Login again.");
    }
    const { autograph, avatar, company, job, author, username } = data;
    this.SET_UserInfo(data);
    this.SET_AUTOGRAPH(autograph);
    this.SET_AVATAR(avatar);
    this.SET_COMPANY(company);
    this.SET_JOB(job);
    this.SET_NICKNAME(author);
    this.SET_USERNAME(username);
  }
}

export const UserModule = getModule(User)