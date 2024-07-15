import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import "../styles/Table.css";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { BiUserCheck, BiUserX } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import data from "../Data.json";
import { Link } from "react-router-dom";

const Table = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.users.slice(firstIndex, lastIndex);
  const npages = Math.ceil(data.users.length / recordPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const dropdown = useRef<HTMLUListElement>(null);
  const totalRecords = data.users.length;
  const cumulativeItems = Math.min(currentPage * recordPerPage, totalRecords);

  const handleEditButton = (index: any) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrPage = (id: number) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== npages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <div className="t-head">
                <p> Organisation</p>
                <IoFilterOutline />
              </div>
            </th>
            <th>
              <div className="t-head">
                <p> Username</p>
                <IoFilterOutline />
              </div>
            </th>
            <th>
              <div className="t-head">
                <p>Email</p>
                <IoFilterOutline />
              </div>
            </th>
            <th>
              <div className="t-head">
                <p> Phone Number</p>
                <IoFilterOutline />
              </div>
            </th>
            <th>
              <div className="t-head">
                <p>Date Joines</p>
                <IoFilterOutline />
              </div>
            </th>
            <th>
              <div className="t-head">
                <p>Status</p>
                <IoFilterOutline />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((user, index) => (
            <tr key={index} className="data-row">
              <td>{user.orgainisation}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td> {user.datejoined}</td>
              <td>{user.status}</td>
              <td>
                <div className="drop">
                  <button
                    className="btn-three-dots"
                    onClick={() => handleEditButton(index)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  <ul
                    ref={dropdown}
                    className={activeDropdown === index ? "drop-down" : "hide"}
                  >
                    <li>
                      <BsEye className="drop-down-icon" /> View Details
                    </li>
                    <li>
                      <BiUserX className="drop-down-icon" /> Blacklist User
                    </li>
                    <li>
                      <BiUserCheck className="drop-down-icon" />
                      Activate User
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="showing">
          <p>Showing</p>
          <div className="num-dropdown">
            {cumulativeItems} <MdKeyboardArrowDown />
          </div>
          <p>Out of {data.users.length}</p>
        </div>
        <div className="number-count">
          <button className="btn-direction" onClick={prevPage}>
            <MdArrowBackIos />
          </button>
          {numbers.map((n, index) => (
            <p
              key={index}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
              <Link
                className="page-number"
                to={""}
                onClick={() => changeCurrPage(n)}
              >
                {n}
              </Link>
            </p>
          ))}
          <button className="btn-direction" onClick={nextPage}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
