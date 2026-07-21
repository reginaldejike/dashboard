import { WiTime4 } from "react-icons/wi";
import "../styles/InputTime.css";
import { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const InputTime = () => {
  const [input, setInput] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [meridian, setMeridian] = useState<string>("AM");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hour = Array.from({ length: 12 }, (_, i) =>
    i < 9 ? "0" + (i + 1) : i + 1
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i < 10 ? "0" + i : "" + i
  );

  console.log("time", minutes);

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

  const handleMeridianClick = (selectedMeridian: string) => {
    if (input) {
      const currentTime = input.split(" ")[0];
      setInput(`${currentTime} ${selectedMeridian}`);
    }
    setMeridian(selectedMeridian);
  };
  const handleClickTime = (time: string) => {
    setInput(`${time} ${meridian}`);
  };
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const formattedTime = formatTime(inputValue);
    setInput(formattedTime);
  };

  const formatTime = (inputValue: any) => {
    const cleanInput = inputValue.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
    let formattedTime = "";
    if (cleanInput.length >= 1) {
      formattedTime += cleanInput.slice(0, 2);
    }
    if (cleanInput.length >= 3) {
      formattedTime += ":" + cleanInput.slice(2, 4);
    }
    if (cleanInput.length >= 5) {
      const amPm = cleanInput.slice(4).replace(/[^APM]/g, "");
      formattedTime += " " + amPm;
    }
    return formattedTime;
  };

  const generateTimes = () => {
    const times = [];
    for (let hr of hour) {
      for (let min of minutes) {
        times.push(`${hr}:${min}`);
      }
    }
    return times;
  };

  const times = generateTimes();
  return (
    <div>
      <label htmlFor="">Time</label>
      <div className="custom-time" onFocus={() => setShow(true)}>
        <WiTime4 className="time-icon" onClick={() => setShow(true)} />
        <input
          type="text"
          className="time-input"
          placeholder="00:00 AM"
          value={input}
          onChange={handleChange}
          onFocus={() => setShow(true)}
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
      <div className={show ? "time-picker-wrapper" : "hide"}>
        <div ref={dropdownRef} className="time-picker">
          <div className="meridian">
            <h3
              className={meridian === "AM" ? "selected" : ""}
              onClick={() => {
                handleMeridianClick("AM");
              }}
            >
              AM
            </h3>
            <h3
              className={meridian === "PM" ? "selected" : ""}
              onClick={() => handleMeridianClick("PM")}
            >
              PM
            </h3>
          </div>
          <div className="time-container">
            <ul className="time-order-list">
              {times.map((time) => (
                <li className="time-list" onClick={() => handleClickTime(time)}>
                  {time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTime;
