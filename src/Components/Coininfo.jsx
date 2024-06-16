import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";


import { chartDays } from "../config/data";
import { CryptoState } from "../Context";

import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="w-3/4 mt-8 md:w-full flex flex-col items-center justify-center   md:px-4 ">
      {!historicData || flag === false ? (
        <div className='flex justify-center  items-center py-10'>
        <h2>Loading...</h2></div>
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="flex mt-4 md:mt-8 justify-around w-full text-white">
            {chartDays.map((day) => (
              <button
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
                className="bg-amber-500 rounded-md text-black p-2 font-bold m-2"
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
