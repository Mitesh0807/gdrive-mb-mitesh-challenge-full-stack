import ReactSpeedometer from 'react-d3-speedometer'

const SpeedoGraph = ({ value }: { value?: number }) => {
    return (
        <div>
            <ReactSpeedometer
                needleHeightRatio={0.7}
                maxSegmentLabels={4}
                segments={1000}
                value={value ? value * 100 : 0}
                maxValue={100}
            />
        </div>
    )
}

export default SpeedoGraph