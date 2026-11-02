import { useState } from "react"
import Head from "next/head"
import HeaderNoBanner from "../components/HeaderNoBanner"
import Footer from "../components/Footer"
import BarbellButton from "../components/BarbellButton"
import PlateOnBarbell from "../components/PlateOnBarbell"
import Container from "../components/Container"
import { weightData } from "../data/weightData.js"
import { GoogleAnalytics } from "@next/third-parties/google"

export default function ReverseCalculator() {
    // State

    // add up the total weight
    const [weight, setWeight] = useState(0)

    // set totalWeight from user input?
    const [totalWeight, setTotalWeight] = useState("")

    // weight at the top of the app
    const [displayWeight, setDisplayWeight] = useState("0")

    // after first plate calculation reset on second button click
    const [calculateBtnClicked, setCalculateBtnClicked] = useState(false)

    // store clicked plates in a state array
    const [platesOnBarbellRight, setPlatesOnBarbellRight] = useState([])
    const [platesOnBarbellLeft, setPlatesOnBarbellLeft] = useState([])

    // TODO: Rename. state of barbells - disable after barbell is selected - false by default
    const [barbell, setBarbell] = useState(false)

    // set barbellWeight for reverse calculator
    const [barbellWeight, setBarbellWeight] = useState(0)

    // reset button
    const [reset, setReset] = useState(false)

    // set kg or lb
    const [isPounds, setIsPounds] = useState(true)

    // functions
    const handleWeightInputChange = (e) => {
        setTotalWeight(e.target.value) // updates state with current value of input
    }

    const reverseCalculateBarbellWeights = (totalWeight) => {
        if (calculateBtnClicked) {
            setWeight(0)
            // setTotalWeight("")
            setPlatesOnBarbellRight([])
            setPlatesOnBarbellLeft([])
        }

        setDisplayWeight(totalWeight)

        // subtract barbell weight
        totalWeight = totalWeight - barbellWeight

        // while loop - iterate through until we run out of weight
        while (totalWeight > 0) {
            // plates from data/weightData.js, heaviest first
            let selectedPlates

            isPounds
                ? (selectedPlates = [
                      ...weightData.plates.lbLargePlates,
                      ...weightData.plates.lbSmallPlates,
                  ])
                : (selectedPlates = [
                      ...weightData.plates.kgLargePlates,
                      ...weightData.plates.kgSmallPlates,
                  ])

            selectedPlates.forEach((plate) => {
                let plateCount = 0

                if (totalWeight / plate.weight >= 2) {
                    // set plateCount and round down
                    plateCount = Math.floor(totalWeight / plate.weight)

                    // if plateCount is odd we probably dont want that...
                    if (plateCount % 2 !== 0) {
                        // odd plateCount - lets get rid of one of them
                        plateCount = plateCount - 1
                    }

                    // subtract plateCount from totalWeight
                    totalWeight = totalWeight - plateCount * plate.weight
                }

                // add weights to barbell
                if (plateCount) {
                    // addWeight plateCount / 2 number of times (each side)
                    for (let i = 0; i < plateCount / 2; i++) {
                        addWeightToBarbell(plate)
                    }
                }
            })
        }

        // ios centers the page when you tap on an input so scroll back up to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth", // This makes the scroll smooth
        })

        // setCalculateBtnClicked after this runs for the first time. Then we clear the barbell before we calculate additional times
        setCalculateBtnClicked(true)
    }

    const addWeightToBarbell = (plate) => {
        setWeight(weight + plate.weight * 2)
        // adds the clicked weightPlate to the end of the platesOnBarbell array
        setPlatesOnBarbellRight((existingPlates) => [
            ...existingPlates,
            {
                weightNum: plate.weight,
                plateColor: plate.color,
                plateSize: plate.size,
            },
        ])
        // adds the clicked weightPlate to the beginning of the platesOnBarbell array
        setPlatesOnBarbellLeft((existingPlates) => [
            {
                weightNum: plate.weight,
                plateColor: plate.color,
                plateSize: plate.size,
            },
            ...existingPlates,
        ])
    }

    const addBarbellWeight = (barbellWeight) => {
        setWeight(weight + barbellWeight)
        setBarbell(true)
        setBarbellWeight(barbellWeight)
    }

    const resetEverything = () => {
        setReset(true)
        setWeight(0)
        setTotalWeight("")
        setDisplayWeight("")
        setBarbell(false)
        setPlatesOnBarbellRight([])
        setPlatesOnBarbellLeft([])
    }

    const switchUnits = (boolean) => {
        resetEverything()
        setIsPounds(boolean)
    }

    return (
        <div className="app-container reverse-calculator">
            <Head>
                <title>🏋️💪 Reverse Barbell Calculator</title>
            </Head>

            <HeaderNoBanner resetEverything={resetEverything} />

            <main>
                <section className="total-weight-section">
                    <h2 className="total-weight" aria-live="polite">
                        <span>
                            {displayWeight ? <>{displayWeight}</> : <>&nbsp;</>}
                            <small>{isPounds ? "lb" : "kg"}</small>
                        </span>
                    </h2>
                    <section className="plates-on-barbell-section">
                        <div
                            className={
                                barbell
                                    ? "barbell-container barbell-selected"
                                    : "barbell-container"
                            }
                        >
                            <div className="plates-on-barbell left-plates">
                                {platesOnBarbellLeft.map((plate, index) => (
                                    <PlateOnBarbell
                                        plateSize={plate.plateSize}
                                        plateColor={plate.plateColor}
                                        weightNum={plate.weightNum}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <div className="plates-on-barbell right-plates">
                                {platesOnBarbellRight.map((plate, index) => (
                                    <PlateOnBarbell
                                        plateSize={plate.plateSize}
                                        plateColor={plate.plateColor}
                                        weightNum={plate.weightNum}
                                        key={index}
                                    />
                                ))}
                            </div>

                            {barbell && (
                                <span className="bar-weight">
                                    {barbellWeight}
                                </span>
                            )}
                        </div>
                    </section>
                </section>

                <section className="barbells-section">
                    <Container>
                        <div className="flex-container">
                            <div className="column weight-units">
                                <h3 className="label" id="units-label">
                                    Units
                                </h3>

                                <div
                                    className="segmented"
                                    role="radiogroup"
                                    aria-labelledby="units-label"
                                >
                                    <input
                                        type="radio"
                                        value="lb"
                                        id="lb"
                                        name="unit"
                                        defaultChecked
                                        onClick={() => switchUnits(true)}
                                    />
                                    <label htmlFor="lb">lb</label>

                                    <input
                                        type="radio"
                                        value="kg"
                                        id="kg"
                                        name="unit"
                                        onClick={() => switchUnits(false)}
                                    />
                                    <label htmlFor="kg">kg</label>
                                </div>
                            </div>

                            <div className="column column--grow barbell">
                                <h3 className="label" id="barbells-label">
                                    Barbell
                                </h3>

                                <div
                                    className="segmented"
                                    role="group"
                                    aria-labelledby="barbells-label"
                                >
                                    {isPounds
                                        ? weightData.barbells.lbBarbells.map(
                                              (barbellWeight, index) => (
                                                  <BarbellButton
                                                      weightNum={barbellWeight}
                                                      onPress={() => {
                                                          addBarbellWeight(
                                                              barbellWeight
                                                          )
                                                      }}
                                                      disableBarbell={barbell}
                                                      reset={reset}
                                                      setReset={setReset}
                                                      key={index}
                                                      unit={"lb"}
                                                  />
                                              )
                                          )
                                        : weightData.barbells.kgBarbells.map(
                                              (barbellWeight, index) => (
                                                  <BarbellButton
                                                      weightNum={barbellWeight}
                                                      onPress={() => {
                                                          addBarbellWeight(
                                                              barbellWeight
                                                          )
                                                      }}
                                                      disableBarbell={barbell}
                                                      reset={reset}
                                                      setReset={setReset}
                                                      key={index}
                                                      unit={"kg"}
                                                  />
                                              )
                                          )}
                                </div>
                            </div>
                        </div>

                        <div className="weight-input">
                            <label className="label" htmlFor="weight-input">
                                Enter Weight
                            </label>
                            <div className="field">
                                <input
                                    id="weight-input"
                                    type="number"
                                    onChange={handleWeightInputChange}
                                    value={totalWeight}
                                    inputMode="decimal"
                                />
                                <span className="field__unit">
                                    {isPounds ? "lb" : "kg"}
                                </span>
                            </div>
                        </div>

                        <input
                            className="button button--block"
                            type="submit"
                            value="Calculate Plates"
                            onClick={() => {
                                reverseCalculateBarbellWeights(totalWeight)
                            }}
                        />
                    </Container>
                </section>
            </main>
            <Footer link={{ href: "/", label: "\u2190 Barbell calculator" }} />
            <GoogleAnalytics gaId="G-PKWXFSGSLF" />
        </div>
    )
}
