import React from 'react';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react';


const Button = () => {
  return (
    <StyledWrapper>
      <button className="shadow__btn flex gap-1 text-base ">
        Enquire Now
        <ArrowUpRight className="w-8 h-6 text-gray-200"/> 
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .shadow__btn {
    padding: 10px 20px;
    border: none;
    font-size: 17px;
    font-style: sans-serif;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 0.5px;
    font-weight: 400;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
  }

  .shadow__btn {
    background: rgb(0,141,255);
    box-shadow: 0 0 25px rgb(0,140,255);
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px rgb(0,255,255),
                0 0 25px rgb(0,200,255),
                0 0 50px rgb(0,140,255),
                0 0 100px rgb(0,140,255);
  }`;

export default Button;
