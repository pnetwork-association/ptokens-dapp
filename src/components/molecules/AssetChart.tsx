import Chart from 'react-apexcharts'
import swapAssets, { Asset, HostAsset, NativeAsset, isNative } from '../../constants/swap-assets'
import { SetStateAction, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

const getNativeAsset = (asset: Asset) => {
  if (isNative(asset))
    return asset as NativeAsset
  else
    return Object.values(swapAssets).find((currAsset: Asset) => currAsset.id === (asset as HostAsset).underlyingAsset) as NativeAsset
}

interface AssetChartProps  {
  asset: Asset
}

const AssetChart = ({asset}: AssetChartProps): JSX.Element => {
  const [series, setSeries] = useState([{
      name: 'series-1',
      data: []
    }])
  const [dataPointIndex, setDataPointIndex] = useState(-1)
  const [value, setValue] = useState('')
  
  useEffect(() => {
    if (dataPointIndex !== -1)
      setValue(`\$${series[0].data[dataPointIndex][1]}`)
  }, [dataPointIndex])

  useEffect(() => {
    const loadData = async (url: string, precision: number) => {
      const params = {
        vs_currency: 'usd',
        days: 1,
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
  }, [asset])

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
    <>
      <div className="flex justify-start mx-5 mt-5">
        <img
            className="w-8"
            src={getNativeAsset(asset) ? `/svg/${getNativeAsset(asset).image}` : '/svg/blockchain.svg'}
          />
        <h1 className='ml-2 text-2xl font-medium'>
          {getNativeAsset(asset).symbol}
        </h1>
      </div>
      <h2 className='mt-2 text-4xl font-medium mx-5'>
        {value ? value : 'N/A'}
      </h2>
      <div className='mx-2'>
        <Chart options={options} series={series} type="line" width={700} height={320} />
      </div>
    </>
  )
}

export default AssetChart