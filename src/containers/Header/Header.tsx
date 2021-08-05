import React from "react";
import Link from "next/link";

import Nav, { NavItem } from "@/components/molecules/Nav";

const Header: React.FC = () => {
  return (
    <div className="h-full flex">
      <div className="flex items-center h-full mx-lg">
        <Link href="/">
          <a className="text-headline-2 text-contrast-secondary">TYPING</a>
        </Link>
      </div>
      <div className="ml-auto">
        <Nav>
          <NavItem href="/">
            <svg
              className="fill-current desktop:mr-sm"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 12C0 13.1 0.9 14 2 14H18C19.1 14 20 13.1 20 12V2C20 0.9 19.1 0 18 0ZM9 3H11V5H9V3ZM9 6H11V8H9V6ZM6 3H8V5H6V3ZM6 6H8V8H6V6ZM5 8H3V6H5V8ZM5 5H3V3H5V5ZM14 12H6V10H14V12ZM14 8H12V6H14V8ZM14 5H12V3H14V5ZM17 8H15V6H17V8ZM17 5H15V3H17V5Z" />
            </svg>

            <span className="hidden desktop:inline text-body-1 font-semibold">Tập gõ phím</span>
          </NavItem>
          <NavItem href="/kiem-tra-toc-do">
            <svg
              className="fill-current desktop:mr-sm"
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0H6V2H12V0ZM16.03 6.39L17.45 4.97C17.02 4.46 16.55 3.98 16.04 3.56L14.62 4.98C13.07 3.74 11.12 3 9 3C4.03 3 0 7.03 0 12C0 16.97 4.02 21 9 21C13.98 21 18 16.97 18 12C18 9.88 17.26 7.93 16.03 6.39ZM9 19C5.13 19 2 15.87 2 12C2 8.13 5.13 5 9 5C12.87 5 16 8.13 16 12C16 15.87 12.87 19 9 19ZM8.68 14H3.35C3.92 15.62 5.17 16.92 6.76 17.56L6.65 17.5L8.68 14ZM14.65 10C14.08 8.4 12.87 7.11 11.31 6.46L9.26 10H14.65ZM7.61 17.83C8.06 17.94 8.52 18 9 18C10.34 18 11.57 17.55 12.57 16.81L10.46 12.91L7.61 17.83ZM4.55 7.99C3.59 9.05 3 10.46 3 12C3 12.34 3.04 12.67 3.09 13H7.81L4.55 7.99ZM13.34 16.13C14.37 15.06 15 13.6 15 12C15 11.66 14.96 11.33 14.91 11H10.57L13.34 16.13ZM10.33 6.15C9.9 6.06 9.46 6 9 6C7.6 6 6.31 6.49 5.29 7.29L7.61 10.85L10.33 6.15Z"
                className="fill-current desktop:mr-sm"
              />
            </svg>
            <span className="hidden desktop:inline text-body-1 font-semibold">Kiểm tra tốc độ</span>
          </NavItem>
          <NavItem href="/thong-ke">
            <svg
              className="fill-current desktop:mr-sm"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 4.2H3V14H0V4.2ZM5.6 0H8.4V14H5.6V0ZM11.2 8H14V14H11.2V8Z" />
            </svg>
            <span className="hidden desktop:inline text-body-1 font-semibold">Thống kê</span>
          </NavItem>
          <NavItem href="/cai-dat">
            <svg
              className="fill-current desktop:mr-sm"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.1401 10.936C17.1761 10.636 17.2001 10.324 17.2001 9.99999C17.2001 9.67599 17.1761 9.36399 17.1281 9.06399L19.1561 7.47999C19.3361 7.33599 19.3841 7.07199 19.2761 6.86799L17.3561 3.54399C17.2361 3.32799 16.9841 3.25599 16.7681 3.32799L14.3801 4.28799C13.8761 3.90399 13.3481 3.59199 12.7601 3.35199L12.4001 0.807994C12.3641 0.567994 12.1601 0.399994 11.9201 0.399994H8.08011C7.84011 0.399994 7.64811 0.567994 7.61211 0.807994L7.25211 3.35199C6.66411 3.59199 6.12411 3.91599 5.63211 4.28799L3.24411 3.32799C3.02811 3.24399 2.77611 3.32799 2.65611 3.54399L0.736107 6.86799C0.616107 7.08399 0.664107 7.33599 0.856107 7.47999L2.88411 9.06399C2.83611 9.36399 2.80011 9.68799 2.80011 9.99999C2.80011 10.312 2.82411 10.636 2.87211 10.936L0.844106 12.52C0.664106 12.664 0.616107 12.928 0.724107 13.132L2.64411 16.456C2.76411 16.672 3.01611 16.744 3.23211 16.672L5.62011 15.712C6.12411 16.096 6.65211 16.408 7.24011 16.648L7.60011 19.192C7.64811 19.432 7.84011 19.6 8.08011 19.6H11.9201C12.1601 19.6 12.3641 19.432 12.3881 19.192L12.7481 16.648C13.3361 16.408 13.8761 16.084 14.3681 15.712L16.7561 16.672C16.9721 16.756 17.2241 16.672 17.3441 16.456L19.2641 13.132C19.3841 12.916 19.3361 12.664 19.1441 12.52L17.1401 10.936ZM10.0001 13.6C8.02011 13.6 6.40011 11.98 6.40011 9.99999C6.40011 8.01999 8.02011 6.39999 10.0001 6.39999C11.9801 6.39999 13.6001 8.01999 13.6001 9.99999C13.6001 11.98 11.9801 13.6 10.0001 13.6Z" />
            </svg>
            <span className="hidden desktop:inline text-body-1 font-semibold">Cài đặt</span>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Header;
