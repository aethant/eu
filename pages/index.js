import Head from "next/head";
import { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import styled from "styled-components";

import Select from "../components/Select";
import Toolbar from "../components/Toolbar";
import CardElements from "../components/CardElements";

const languageSelectorOptions = [
  { value: "", label: "Filter by number of languages spoken..." },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3+" },
];

const Home = () => {
  const [data, setData] = useState([]);
  const [subregions, setSubregions] = useState([]);

  const [sortNameAsc, setSortNameAsc] = useState("");
  const [sortPopulationAsc, setSortPopulationAsc] = useState("");
  const [filterBySubregion, setFilterBySubregion] = useState("");
  const [filterByLanguageCount, setFilterByLanguageCount] = useState("");

  useEffect(() => {
    (async () => {
      const { data = [] } = await Axios({
        method: "get",
        url: "/api/countrydata",
      });

      setSubregions([...new Set(data.map((cntry) => cntry.subregion))]);
      setData(data);
    })();
  }, []);

  const hasSubRegion = ({ subregion }) =>
    filterBySubregion ? subregion === filterBySubregion : true;

  const handleFilterBySubregion = ({ target: { value } }) =>
    setFilterBySubregion(value || "");

  const hasLanguageCount = ({ languages }) => {
    if (!filterByLanguageCount) return true;

    const filterCount = Number(filterByLanguageCount);
    const cnt = [...(languages || [])].length;

    if (filterCount < 3) return filterCount === cnt;
    return cnt >= 3;
  };

  const handleFilterByLanguageCount = ({ target: { value } }) =>
    setFilterByLanguageCount(value || 0);

  const sortCountryName = (...args) => {
    if (!sortNameAsc.length) return true;

    const [a, b] = sortNameAsc === "asc" ? args : args.reverse();
    return a.name.localeCompare(b.name);
  };

  const handlerSortByCountryName = ({ target: { value } }) => {
    if (sortNameAsc === value) return setSortNameAsc("");
    setSortNameAsc(value);
  };

  const sortPopulation = (...args) => {
    if (!sortPopulationAsc) return true;

    const [a, b] = sortPopulationAsc === 1 ? args : args.reverse();
    return Number(b.population) - Number(a.population);
  };

  const handlerSortByPopulation = ({ target: { value } }) => {
    if (sortPopulationAsc === Number(value)) return setSortPopulationAsc("");

    setSortPopulationAsc(Number(value));
  };

  const dataset = useMemo(() => {
    const filteredData = data.filter(
      (e) => hasSubRegion(e) && hasLanguageCount(e)
    );

    return filteredData.sort(sortCountryName);
  }, [
    data,
    filterBySubregion,
    filterByLanguageCount,
    sortNameAsc,
    sortPopulationAsc,
  ]);

  return (
    <Container>
      <Toolbar>
        <Select onChangeHandler={handleFilterBySubregion}>
          <option value={""}>Filter by a subregion...</option>
          {subregions.map((subregion) => (
            <option key={subregion} value={subregion}>
              {subregion}
            </option>
          ))}
        </Select>
        <Select onChangeHandler={handleFilterByLanguageCount}>
          {languageSelectorOptions.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Fieldset id="namesort">
          <label htmlFor="name_asc">A-Z</label>
          <input
            type="radio"
            value="asc"
            name="namesort"
            id="name_asc"
            onClick={handlerSortByCountryName}
            readOnly
            checked={sortNameAsc === "asc"}
          />
          <label htmlFor="name_desc">Z-A</label>
          <input
            type="radio"
            value="desc"
            name="namesort"
            id="name_desc"
            onClick={handlerSortByCountryName}
            readOnly
            checked={sortNameAsc === "desc"}
          />
        </Fieldset>
        <Fieldset id="populationsort">
          <label htmlFor="population_asc">High-Low</label>
          <input
            type="radio"
            value="1"
            name="populationsort"
            id="population_asc"
            onClick={handlerSortByPopulation}
            readOnly
            checked={sortPopulationAsc === 1}
          />
          <label htmlFor="population_desc">Low-High</label>
          <input
            type="radio"
            value="2"
            name="populationsort"
            id="population_desc"
            onClick={handlerSortByPopulation}
            readOnly
            checked={sortPopulationAsc === 2}
          />
        </Fieldset>
      </Toolbar>
      <Wrapper>
        {[...(dataset || [])].map((cntry, index) => (
          <Card key={index}>
            <CardFlag img={cntry.flag} />
            <CardElements
              capital={cntry.capital}
              subregion={cntry.subregion}
              population={cntry.population}
              languages={cntry.languages}
            />
            <CardCountryName>
              <h3>{cntry.name}</h3>
            </CardCountryName>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 98%;
  max-width: 960px;

  background: #fff;

  * {
    font-family: "Open Sans", sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 100%;
`;

const Card = styled.section`
  align-items: center;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 1px #eaeaea, -1px -1px 1px #eaeaea;
  display: flex;
  flex-direction: column;
  flex: 100%;
  justify-content: flex-start;
  margin: 1rem 0;
  position: relative;

  @media (min-width: 481px) {
    flex: 0 0 48%;
  }

  @media (min-width: 769px) {
    flex: 0 0 32%;
  }
`;

const CardFlag = styled.div.attrs((props) => ({
  flagImage: props.img,
}))`
  background-image: ${(props) => `url(${props.flagImage})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  height: 30vh;
  width: 100%;

  @media (min-width: 481px) {
    height: 20vh;
  }
`;

const CardCountryName = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const Fieldset = styled.fieldset`
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 481px) {
    width: auto;
  }
`;
