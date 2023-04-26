// 权限问题后期增加
import { get } from '/@/utils/http/axios';
// import axios from 'axios';
enum URL {
  allCate = '/api/category/all',
  defaultWebsite = '/api/website/default/',
  logout = '/user/logout',
  profile = '/user/profile',
}
// interface LoginRes {
//   token: string;
// }
interface AllCateRes {
  data: Object[];
  message: string;
  status: number;
}

// export interface LoginData {
//   username: string;
//   password: string;
// }

const getAllCate = async () => get<AllCateRes>({ url: URL.allCate });
const getDefaultWebsite = async (id: number) => get({ url: `/api/website/default/${id}` });
// const login = async (data: LoginData) => post<any>({ url: URL.login, data });
// const logout = async () => post<LoginRes>({ url: URL.logout });
export { getAllCate, getDefaultWebsite };
