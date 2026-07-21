import { SlCalender } from "react-icons/sl";
import "../styles/InputDate.css";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useEffect, useState, useRef } from "react";

const InputDate = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [show, setShow] = useState<boolean>(false);
  const [showYear, setShowYear] = useState<boolean>(false);
  const [inputDate, setInputDate] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from(
    { length: 200 },
    (_, i) => new Date().getFullYear() - 100 + i
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const renderCalender = () => {
    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();

    const prevDates = Array.from({ length: start }, (_, i) => (
      <li
        key={`prev-${i}`}
        className="inactive"
        onClick={() => handlePreDateClick(endDatePrev - start + i + 1)}
      >
        {endDatePrev - start + i + 1}
      </li>
    ));

    const currentDates = Array.from({ length: endDate }, (_, i) => {
      const day = i + 1;
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      return (
        <li
          key={day}
          className={isToday ? "today" : ""}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </li>
      );
    });

    const nextDates = Array.from({ length: 6 - end }, (_, i) => (
      <li
        key={`next-${i}`}
        className="inactive"
        onClick={() => handleNextDateClick(i + 1)}
      >
        {i + 1}
      </li>
    ));

    return [...prevDates, ...currentDates, ...nextDates];
  };

  const handleYearSelected = (selectedYear: number) => {
    setYear(selectedYear);
    setShowYear(false);
  };
  const handleDateClick = (day: number) => {
    setInputDate(`${day}-${month + 1}-${year}`);
    // setShow(false);
  };

  const handlePreDateClick = (day: number) => {
    setInputDate(`${day}-${month}-${year}`);
    // setShow(false);
  };
  const handleNextDateClick = (day: number) => {
    setInputDate(`${day}-${month + 2}-${year}`);
    // setShow(false);
  };

  const handleNavClick = (increment: number) => {
    let newMonth = month + increment;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const handleDateChange = (e: any) => {
    const inputValue = e.target.value;
    const formattedDate = formatInputDate(inputValue);
    setInputDate(formattedDate);
  };

  const formatInputDate = (inputValue: any) => {
    const cleanedInput = inputValue.replace(/\D/g, "");
    let formattedDate = "";

    if (cleanedInput.length >= 1) {
      formattedDate += cleanedInput.slice(0, 2);
    }
    if (cleanedInput.length >= 3) {
      formattedDate += "-" + cleanedInput.slice(2, 4);
    }
    if (cleanedInput.length >= 5) {
      formattedDate += "-" + cleanedInput.slice(4, 8);
    }
    return formattedDate;
  };

  return (
    <div className="date-component-wrapper">
      <label htmlFor="date">Date</label>
      <div className="custom-date">
        <div className="date-icon">
          <SlCalender />
        </div>
        <input
          id="date"
          type="text"
          value={inputDate}
          placeholder="00-00-1994"
          className="date-input"
          onChange={handleDateChange}
        />
        <div>
          {!show ? (
            <MdKeyboardArrowDown
              onClick={() => {
                setShow(!show);
              }}
            />
          ) : (
            <MdKeyboardArrowUp
              onClick={() => {
                setShow(!show);
              }}
            />
          )}
        </div>
      </div>

      <div ref={dropdownRef} className={show ? `datepicker-calender` : `hide`}>
        <div className="heading">
          <div className="heading-up-down-flex">
            <h3
              onClick={() => setShowYear(!showYear)}
            >{`${months[month]} ${year}`}</h3>
            <ul className={showYear ? "year" : "hide"}>
              {years.map((yr) => (
                <li
                  className={yr === currentYear ? "current-year" : "year-list"}
                  onClick={() => handleYearSelected(yr)}
                >
                  {yr}
                </li>
              ))}
            </ul>
            <button className="month-change">
              <MdKeyboardArrowUp onClick={() => setYear(year + 1)} />
            </button>
            <button className="month-change">
              <MdKeyboardArrowDown onClick={() => setYear(year - 1)} />
            </button>
          </div>

          <div>
            <button className="month-change goto-prev-month">
              <MdArrowBackIos onClick={() => handleNavClick(-1)} />
            </button>
            <button className="month-change goto-next-month">
              <MdArrowForwardIos onClick={() => handleNavClick(1)} />
            </button>
          </div>
        </div>

        <div>
          <ul className="days">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="dates">{renderCalender()}</ul>
        </div>
      </div>
    </div>
  );
};

export default InputDate;
