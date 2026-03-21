import React from 'react';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react';


const Button2 = () => {
  return (
    <StyledWrapper>
      <button className="shadow__btn flex gap-1 text-base ">
        Whatsapp Us
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
    background: rgb(72, 187, 120);
    box-shadow: 0 0 25px rgb(72, 187, 120);
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px rgb(72, 187, 120),
                0 0 25px rgb(72, 187, 120),
                0 0 50px rgb(72, 187, 120),
                0 0 100px rgb(72, 187, 120);
  }`;

export default Button2;
