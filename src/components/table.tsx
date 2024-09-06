import { useEffect } from "react";
import Input from "./input";
import { getUsers } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";
import { useAppSelector } from "../store/hooks";
import { User } from "../types/User";

import {
  setNameFilter,
  setUsernameFilter,
  setEmailFilter,
  setPhoneFilter,
  useAllFiltres,
} from "../store/userSlice";

const Table = () => {
  const dispatch = useAppDispatch();

  const { filteredUsers, loading, filtersValue } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(useAllFiltres());
  }, [filtersValue]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra ">
        <thead>
          <tr>
            <th></th>
            <th>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                toggle={(e) => {
                  const target = e.target as HTMLInputElement;
                  dispatch(setNameFilter(target.value));
                }}
              />
            </th>
            <th>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                toggle={(e) => {
                  const target = e.target as HTMLInputElement;
                  dispatch(setUsernameFilter(target.value));
                }}
              />
            </th>
            <th>
              <Input
                type="text"
                placeholder="Email"
                name="email"
                toggle={(e) => {
                  const target = e.target as HTMLInputElement;
                  dispatch(setEmailFilter(target.value));
                }}
              />
            </th>
            <th>
              <Input
                type="text"
                placeholder="Phone"
                name="phone"
                toggle={(e) => {
                  const target = e.target as HTMLInputElement;
                  dispatch(setPhoneFilter(target.value));
                }}
              />
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <span class="loading loading-infinity loading-sm"></span>
              </td>
              <td>
                <span class="loading loading-infinity loading-sm"></span>
              </td>
              <td>
                <span class="loading loading-infinity loading-sm"></span>
              </td>
              <td>
                <span class="loading loading-infinity loading-sm"></span>
              </td>
              <td>
                <span class="loading loading-infinity loading-sm"></span>
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <th>#</th>
              <td>Not Founds</td>
              <td>Not Founds</td>
              <td>Not Founds</td>
              <td>Not Founds</td>
            </tr>
          ) : (
            filteredUsers.map(({ id, name, username, email, phone }: User) => (
              <tr>
                <th>{id}</th>
                <td>{name}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
