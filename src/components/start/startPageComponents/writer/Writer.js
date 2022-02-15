import "./Writer.css";
import { useState, useEffect } from "react";



const TypeWriter = ({ content = "", speed = 1000 }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/

        if (index >= content.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  useEffect(() => {
    setDisplayedContent((displayedContent)=>displayedContent + content[index])
  }, [index])

  return <pre className="type-writer">{displayedContent}</pre>;
};

const sample_content = `Join the first Blockchain
Identity Plattform`;

const Writer = (props) => {



return <TypeWriter content={props.text} speed={20} />;
}


;

export default Writer;