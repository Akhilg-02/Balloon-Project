import "./Baloon.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useEffect, useState } from "react";

export const Baloon = () => {
  const [ball, setBall] = useState([]);
  const [input, setInput] = useState("");
  //console.log(input, ball);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 5)];
    }
    return color;
  }

  const changeHandler = (e) => {
    setInput(e.target.value);
    //   console.log(e.target.value);
  };

  const shootHandler = (e) => {
    if (input == "") return alert("Please put a number");

    let possible = input.split("").map(Number);
    let newArr = [...ball];

    newArr = newArr.map((e, i) => {
      //console.log(possible.includes(e.val), possible, e.val);
      if (possible.includes(e.val + 1)) {
        return { ...e, status: false };
      } else {
        return { ...e };
      }
    });
    //console.log(possible);
    setBall(newArr);
    setInput((prev) => {
      return "";
    });
    //setInput("");
  };

  const removeHandler = (e) => {
    console.log(e);
    let newArr = ball.map((a) => {
      if (a.val === e.val) {
        return { ...a, status: true };
      }

      return { ...a };
    });
    setBall(newArr);
  };

  useEffect(() => {
    let arr = new Array(5).fill(-1);
    arr = arr.map((e, i) => {
      return { val: i, status: true, color: getRandomColor() };
    });
    setBall(arr);
    console.log(arr);
  }, []);

  //-----------------------------------------------------------------------------
  const Dispaly = ({ statusVal }) => {
    console.log(statusVal);
    return ball.map((e) => {
      if (e.status == statusVal) {
        return (
          <>
            <div
              onClick={(a) => {
                removeHandler(e);
              }}
              className="circle"
              style={{ backgroundColor: e.color }}
            ></div>
          </>
        );
      }
    });
  };
  //---------------------------------------------------------------
  return (
    <>
    
      <div className="container">
          
        <div className="left">
          <Dispaly statusVal={false} />
        </div>
            
        <div className="middle">
            
          <Dispaly statusVal={true} />
        </div>

        <div className="right">
          <TextField
            onChange={changeHandler}
            value={input}
            id="demo-helper-text-misaligned"
            label="Enter a number"
          />

          <Button
            onClick={shootHandler}
            variant="outlined"
            endIcon={<DoubleArrowIcon />}
          >
            Shoot
          </Button>
        </div>
      </div>
    </>
  );
};
