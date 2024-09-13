import Chart from 'react-apexcharts'
import swapAssets, { Asset, HostAsset, NativeAsset, isNative } from '../../constants/swap-assets'
import { SetStateAction, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import cn from 'classnames'
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri'

interface AssetChartProps  {
  asset: Asset
  width?: number
  height?: number
}

type TimeUnit = 'y' | 'm' | 'w' | 'd'

type GainLoss = 'Gain' | 'Loss' | 'NoData'

type GainLossT = {
  amount: string
  type: GainLoss
}

const getNativeAsset = (asset: Asset) => {
  if (isNative(asset))
    return asset as NativeAsset
  else
    return Object.values(swapAssets).find((currAsset: Asset) => currAsset.id === (asset as HostAsset).nativeAsset) as NativeAsset
}

const computeGainLoss = (from: number, to: number) => (to - from) / to * 100

const AssetChart = ({asset, width = 700, height = 320}: AssetChartProps): JSX.Element => {
  const [timeFrame, setTimeFrame] = useState<TimeUnit>('w')
  const [numberOfDays, setNumberOfDays] = useState<number>(7)
  const [series, setSeries] = useState([{
      name: 'series-1',
      data: []
    }])
  const [dataPointIndex, setDataPointIndex] = useState(-1)
  const [value, setValue] = useState('')
  const [lastValue, setLastValue] = useState<string>('N/A')
  const [firstValue, setFirstValue] = useState<string>('N/A')
  const [gains, setGains] = useState<string | GainLossT>('-')
  
  const btn1Year = cn({
    "btn btn-xs btn-outline btn-accent ml-2": true,
    "btn-active": timeFrame === 'y',
  })
  
  const btn1Month = cn({
    "btn btn-xs btn-outline btn-accent ml-2": true,
    "btn-active": timeFrame === 'm',
  })
  
  const btn1Week = cn({
    "btn btn-xs btn-outline btn-accent ml-2": true,
    "btn-active": timeFrame === 'w',
  })
  
  const btn1Day = cn({
    "btn btn-xs btn-outline btn-accent ml-2": true,
    "btn-active": timeFrame === 'd',
  })

  const gainLoss = cn({
    "mr-5 mt-2": true,
    "text-green-500": (typeof gains === 'object' && gains.type === 'Gain'),
    "text-red-500": (typeof gains === 'object' && gains.type === 'Loss'),
  })

  const getGainLoss = (from: string, to: string): GainLossT | string => {
    const gainLoss = (Number(from) && Number(to)) ? computeGainLoss(Number(from), Number(to)) : '-'
    if (typeof gainLoss === 'number' && gainLoss >= 0)
      return {amount: gainLoss.toString().slice(0,4).concat('%'), type: 'Gain'}
    else if (typeof gainLoss === 'number' && gainLoss < 0)
      return {amount: gainLoss.toString().slice(1,5).concat('%'), type: 'Loss'}
    else
      return {amount: gainLoss.toString(), type: 'NoData'}
  }

  useEffect(() => {
    setGains(getGainLoss(firstValue, lastValue))
  }, [firstValue, lastValue])
  
  useEffect(() => {
    if (dataPointIndex !== -1)
      setValue(`\$${series[0].data[dataPointIndex][1]}`)
  }, [dataPointIndex])

  useEffect(() => {
    const days = timeFrame === 'y' ? 365 : timeFrame === 'm' ? 30 : timeFrame === 'w' ? 7 : timeFrame === 'd' ? 1 : 7
    setNumberOfDays(days)
  }, [timeFrame])

  useEffect(() => {
    const dataArrayLength = series[0].data.length
    if (dataArrayLength > 0 && typeof series[0].data[dataArrayLength - 1][1] === 'number') {
      setFirstValue(series[0].data[0][1])
      setLastValue(series[0].data[dataArrayLength - 1][1])
    } 
    else
      setLastValue('N/A')
  }, [series[0].data])

  useEffect(() => {
    const loadData = async (url: string, precision: number) => {
      const params = {
        vs_currency: 'usd',
        days: numberOfDays,
        precision: precision,
      };
      try {
        const data = await axios.get(url, {
          params: params,
          headers: {
            'accept': 'application/json',
          },
        })
        setSeries([{
          name: 'Series-1',
          data: data.data.prices
        }])
      } catch (err: unknown) {
        console.error('CoinGecko API error:', (err as AxiosError).message)
      }
    }
    loadData(getNativeAsset(asset).marketApi, 4)
  }, [asset, numberOfDays])

  const options: ApexCharts.ApexOptions = {
    chart: {
      events: { 
        mouseMove: function(_event: any, _chartContext: any, _config: { dataPointIndex: SetStateAction<number> }) {
          setDataPointIndex(_config.dataPointIndex)
        }
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 3,
      dashArray: 0, 
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      x: {
        show: true,
        format: 'dd MMM hh:mm',
        formatter: undefined,
      },
      z: {
        title: 'Uno'
      },
      marker: {
        show: false,
     },
      theme: 'dark',
      custom: function() {
        return null
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: '#4299e1',
              opacity: 1,
            },
          ],
        ],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  }

  return(
    <div className='bg-base-100 m-2 mb-1 lg:m-3 rounded-lg'>
      <div className="flex justify-between">
        <div className="flex justify-start mx-5 mt-5">
          <img
              className="w-8"
              src={getNativeAsset(asset) ? `/svg/${getNativeAsset(asset).image}` : '/svg/blockchain.svg'}
            />
          <h1 className='ml-2 text-2xl font-medium text-slate-100'>
            {getNativeAsset(asset).id}
          </h1>
        </div>
        <div className='ml-5 mr-2 mt-5'>
          <button className={btn1Year} onClick={() => setTimeFrame('y')}>1y</button>
          <button className={btn1Month} onClick={() => setTimeFrame('m')}>1m</button>
          <button className={btn1Week} onClick={() => setTimeFrame('w')}>1w</button>
          <button className={btn1Day} onClick={() => setTimeFrame('d')}>1d</button>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className='mt-2 text-4xl font-medium mx-5 text-slate-100'>
          {value ? value : lastValue}
        </h2>
        <div className={gainLoss}>
          {typeof gains === 'object' ? (
            <div className='flex align-middle'>
              <div className='mt-1'>
                {gains.type === 'Loss' ? (
                  <RiArrowRightDownLine />
                ) : gains.type === 'Gain' ? (
                  <RiArrowRightUpLine />
                ) : null}
              </div>
              {gains.amount}
            </div>
          ) : gains}
        </div>
      </div>
      <div className='mx-2'>
        <Chart options={options} series={series} type="line" width={width} height={height} />
      </div>
    </div>
  )
}

export default AssetChart