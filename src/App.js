import { useEffect, useState } from "react";
import Prayer from "./componnt/prayer";

function App() {
  const [times, setTimes] = useState([]);
  const [dataTime, setDataTime] = useState("");
  const [city, setCity] = useState("cairo");

  const cityis = [
    { name: "القاهره", value: "Cairo" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "الجيزه", value: "Giza" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const FatchPrayer = async () => {
      try {
        const respons = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`
        );
        const datePrayer = await respons.json();

        setTimes(datePrayer.data.timings);
        setDataTime(datePrayer.data.date.gregorian.date);

        console.log(datePrayer);
        console.log(datePrayer.data.date.gregorian.date);
        console.log(city);
      } catch (error) {
        console.log(error);
      }
    };

    FatchPrayer();
  }, [city]);


  const convertTo12HourFormat = (time) => {
    if(!time){
      return"00:00"
    }

    const [hours, minutes] = time.split(':').map(Number);
    const Perd = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; 
    return `${adjustedHours}:${minutes <10 ? "0"+minutes :minutes} ${Perd}`;
  };

  return (
    <>
      <section>
        <div className="contener">
          <div className="top-sc">
            <div className="city">
              <h3>المدينه</h3>
              <select name="" id="" onChange={(e) => setCity(e.target.value)}>
                {cityis.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{dataTime}</h4>
            </div>
          </div>

          <Prayer name="الفجر:" time={convertTo12HourFormat(times.Fajr)} />
          <Prayer name="الضهر:" time={convertTo12HourFormat(times.Dhuhr)} />
          <Prayer name="العصر:" time={convertTo12HourFormat(times.Asr)} />
          <Prayer name="المغرب:" time={convertTo12HourFormat(times.Maghrib)} />
          <Prayer name="العشاء:" time={convertTo12HourFormat(times.Isha)} />
        </div>
      </section>
    </>
  );
}

export default App;
