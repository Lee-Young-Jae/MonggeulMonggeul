import React from "react";

interface CheckListProps {
  checkList: string[];
  setCheckList: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckList = ({ checkList, setCheckList }: CheckListProps) => {
  return (
    <div>
      {checkList.map((check, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              checked={check === "true"}
              value={check}
              onChange={(e) => {
                const newCheckList = [...checkList];
                newCheckList[index] = e.target.checked.toString();
                setCheckList(newCheckList);
              }}
            />
            <span>{check}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckList;
