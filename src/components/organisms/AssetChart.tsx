import Chart from 'react-apexcharts'
import axios from 'axios'
import { 
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { BaseAsset } from '../../settings/swap-assets'
import assets from '../../settings/swap-assets'
import { useEffect, useState } from 'react'

const getNativeAsset = (asset: BaseAsset) =>
  assets.find(_asset => _asset.nativeSymbol === asset.nativeSymbol && _asset.isNative)

interface AssetChartProps  {
  asset: any
}

const AssetChart: React.FC<AssetChartProps> = ({asset}) => {
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
    const loadData = async (url, precision) => {
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
        // const [time, value] = refactorData(data.data.prices)
        setSeries([{
          name: 'Series-1',
          data: data.data.prices
        }])
      } catch (err) {
        console.error('CoinGecko API error:', err.message)
      }
    }
    loadData(getNativeAsset(asset).marketApi, 2)
  }, [asset])

  const options = {
    chart: {
      events: { 
        mouseMove: function(event, chartContext, config) {
          setDataPointIndex(config.dataPointIndex)
        }
      },
      toolbar: {
        show: false,
      },
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
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
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
      show: false,
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
      color: "black",
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

  return (
    <Flex flexDirection={'column'}>
      <Flex alignContent={'flex-start'}>
        <Image
            boxSize='30px' 
            src={getNativeAsset(asset) ? `/assets/svg/${getNativeAsset(asset).image}` : '/assets/svg/blockchain.svg'}
          />
        <Heading fontSize={22} ml='2'>
          {asset.nativeSymbol}
        </Heading>
      </Flex>
      <Text fontSize={36}>
        {value}
      </Text>
      <Chart options={options} series={series} type="line" width={700} height={420} />
    </Flex>
  )
}

export default AssetChart