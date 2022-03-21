const testApi = async () => {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=41&offset=440`;
  get_data(url);
};

const get_data = async (url) => {
  try {
    const result = await fetch(url, { method: "GET" });
    const data = await result.json();
    getPokemonName(data);
  } catch (error) {
    console.log("ocurrio un error al obtener datos");
  }
};

const getPokemonName = (data) => {
  const array1 = [];
  for (let i = 1; i < 41; i++) {
    var objeto = {
      id: i,
      name: data.results[i].name,
    };
    array1.push(objeto);
  }

  get_pokemon_info(array1);
};

const array2 = [];
const get_pokemon_info = async (array) => {
  for (let i = 0; i < array.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${array[i].name}`;

    try {
      const result = await fetch(url, { method: "GET" });
      const data = await result.json();

      let pokemonImg = data.sprites.front_default;
      let pokemonImg1 = data.sprites.back_default;
      let pokemonImg2 = data.sprites.front_shiny;
      let pokemonImg3 = data.sprites.back_shiny;
      let experience = data.base_experience;
      let ability1 = data.abilities[0].ability.name;
      let weight = data.weight;
      let move = data.moves[0].move.name;
      let base_stat = data.stats[0].base_stat;

      var objeto = {
        id: i,
        name: array[i].name,
        img: pokemonImg,
        img1: pokemonImg1,
        img2: pokemonImg2,
        img3: pokemonImg3,
        ability: ability1,
        weight: weight,
        experience: experience,
        move: move,
        base_stat: base_stat,
      };

      array2.push(objeto);
    } catch (error) {
      console.log(" Error obtner datos pokemon");
    }
  }

  putPokemon(array2);
};

const putPokemon = (arr) => {
  const list1 = document.getElementById("list1");
  list1.innerHTML = "";

  const list2 = document.getElementById("list2");
  list2.innerHTML = "";

  const list3 = document.getElementById("list3");
  list3.innerHTML = "";

  const list4 = document.getElementById("list4");
  list4.innerHTML = "";

  const list5 = document.getElementById("list5");
  list5.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const item = document.createElement("ion-item");
    const label = document.createElement("ion-label");
    const img = document.createElement("img");
    const a = document.createElement("a");

    label.textContent = arr[i].name;
    label.setAttribute(
      "style",
      "font-family: 'Press Start 2P', cursive; color:gray; "
    );
    item.appendChild(label);
    img.setAttribute("src", arr[i].img);
    img.setAttribute("alt", "img-pokemon");
    item.appendChild(img);
    a.appendChild(item);
    a.setAttribute("onClick", "presentModal(id)");
    a.setAttribute("id", arr[i].name);

    if (i < 8) {
      list1.appendChild(a);
    }

    if (i >= 8 && i < 16) {
      list2.appendChild(a);
    }

    if (i >= 16 && i < 24) {
      list3.appendChild(a);
    }

    if (i >= 24 && i < 32) {
      list4.appendChild(a);
    }

    if (i >= 32 && i < 40) {
      list5.appendChild(a);
    }
  }
};

function presentModal(id) {
  pokemonDetailModal(id, array2);
  const modal = document.getElementById("trigger-button");
  modal.click();
}

function dismissModal() {
  const modal = document.querySelector("ion-modal");
  modal.dismiss();
}

function pokemonDetailModal(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (id == array[i].name) {
      const title = document.getElementById("pokemon-title");
      const img = document.getElementById("pokemon-img");
      const img1 = document.getElementById("img-pokemon1");
      const img2 = document.getElementById("img-pokemon2");
      const img3 = document.getElementById("img-pokemon3");
      const ability = document.getElementById("ability");
      const weight = document.getElementById("weight");
      const experience = document.getElementById("experience");
      const move = document.getElementById("move");
      const base_stat = document.getElementById("base_stat");

      title.textContent = array[i].name;
      title.setAttribute(
        "style",
        "font-family: 'Press Start 2P', cursive; color:gray; "
      );
      img.setAttribute("src", array[i].img);
      img1.setAttribute("src", array[i].img1);
      img2.setAttribute("src", array[i].img2);
      img3.setAttribute("src", array[i].img3);
      ability.textContent = array[i].ability;
      experience.textContent = array[i].experience;
      move.textContent = array[i].move;
      weight.textContent = array[i].weight;
      base_stat.textContent = array[i].base_stat;
    }
  }
}

var slides = document.querySelector("ion-slides");

slides.options = {
  initialSlide: 0,
  speed: 450,
};

testApi();
