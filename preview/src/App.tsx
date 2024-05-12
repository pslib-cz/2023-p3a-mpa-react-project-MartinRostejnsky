import { Calendar, Locale } from '../../calendar/src';
import './App.css';

function App() {
  return (
    <>
      <Calendar
      locale={Locale.EN}
      data={{
        date: new Date(),
        events: [
          {
            start: new Date(),
            end: new Date(),
            title: 'Event 1',
          },
          {
            start: new Date("04-23-2024"),
            end: new Date("04-28-2024"),
            title: 'Event 2',
          },
          {
            start: new Date("04-24-2024"),
            end: new Date("04-27-2024"),
            title: 'Event 3 ma hodne dlouhy jmeno a je to dlouhy event',
            customData: [
              {
                key: 'customKey',
                value: 'customValue',
              },
            ],
          },
          
        ],
      }}
      />
    </>
  )
}

export default App
