import React from "react"
import logo from '../images/dogLogo.png';
import breedsFile from './breeds.txt';
import { useEffect, useState } from 'react';

function Form() {
  const [img, setImg] = useState("https://images.dog.ceo/breeds/groenendael/n02105056_5299.jpg")
  const [dogAPI, setDogAPI] = useState("https://dog.ceo/api/breeds/image/random")
  const [breedsList, setBreedsList] = useState([]);

  const btnClick = () => {
    var dropDown = document.getElementById("ratings");
    if (dropDown.selectedIndex !== 0) {
      //resets dropdown rating selection
      dropDown.selectedIndex = 0;

      //generates new random dog image
      fetch(dogAPI)
        .then(response => response.json())
        .then(data => setImg(data.message));
    }
  }

  const breedOptions = (file) => {
    var x = document.getElementById("breeds");

    fetch(file)
      .then(a => a.text())
      .then(text => text.split(" "))
      .then(filter => {
        setBreedsList(filter)

        for (let i = 1; i < filter.length; i++) {
          var option = document.createElement("option");
          option.text = filter[i];
          option.value = filter[i];
          x.add(option, x[i]);
          //console.log(filter[i]);
        }
      }
      );
  }

  const filterChange = () => {
    var breed = document.getElementById("breeds").selectedIndex;
    if (breed === 0) { setDogAPI("https://dog.ceo/api/breeds/image/random"); }
    else {
      setDogAPI("https://dog.ceo/api/breed/" + breedsList[breed] + "/images/random");

      fetch("https://dog.ceo/api/breed/" + breedsList[breed] + "/images/random")
        .then(response => response.json())
        .then(data => setImg(data.message));
    }
  }

  useEffect(() => {
    breedOptions(breedsFile);
  }, [])

  return (
    <>
      <section id="leftHalf">
        <header>
          <img src={logo} alt="dogLogo" />
          <p className="filter">Filter: </p>
          <select id="breeds" onChange={filterChange}>
            <option value="0" defaultValue>Show all breeds</option>
          </select>
        </header>
        <section id="content">
          <h1 className="title">Rate My Dog</h1>
          <p className="text">Rate this dog from 10/10 (dogs are cool 😎) to 15/10 (dogs are AMAZING ✨)?</p>
          <select id="ratings">
            <option value="default" defaultValue>Rate the Dog 🐶</option>
            <option value="0">10/10 (COOL 😎)</option>
            <option value="1">11/10 (WOWWWW 😁)</option>
            <option value="2">12/10 (SUPER COOL 😆)</option>
            <option value="3">13/10 (AWESOME 😍)</option>
            <option value="4">14/10 (AMAZEBALLS 🤩)</option>
            <option value="5">15/10 (✨AMAZING✨)</option>
          </select>
          <button onClick={btnClick}>SUBMIT</button>
        </section>
      </section>
      <section id="rightHalf">
        <img src={img} alt="a-dog" className="dogImg" />
      </section>
    </>
  )
}

export default Form;