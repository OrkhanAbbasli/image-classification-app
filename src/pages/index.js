import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useState} from "react";
import {loadModel, loadImage} from "@/utils/imageProcessing";

export default function Home() {
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState([]);

    const handleAnalyzeClick = async () => {
        const fileInput = document.getElementById("image-upload");
        const imageFile = fileInput.files[0];

        if (!imageFile) {
            alert("Şəkil seçimi et.");
            return;
        }

        try {
            const image = await loadImage(imageFile);
            const predictions = await model.classify(image, 10);
            console.log(predictions)
            setPredictions(predictions);
        } catch (error) {
            console.error('Şəkilin analizi zamanı xəta baş verdi:', error);
        }
    };

    useState(() => {
        (async () => {
            try {
                const loadedModel = await loadModel();
                setModel(loadedModel);
            } catch (error) {
                console.error('Modelin yüklənməsi zamanı xəta baş verdi:', error);
            }
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Image Classification App - Orkhan Abbasli M664A3</title>
                <meta name="description" content="Image Classification App - Orkhan Abbasli M664A3"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div
                className={`${styles.page}`}
            >
                <main className={styles.main}>
                    <h1 className={styles.title}>Süni intellekt əsaslı şəkil klassifikasiyası</h1>
                    <p className={styles.description}>
                        Şəkil seçimi edin.
                    </p>

                    <div id="input-area">
                        <input type="file" className={styles.input} id="image-upload"/>
                        <button className={styles.button} onClick={handleAnalyzeClick}>
                            Başla.
                        </button>
                    </div>

                    <div id="output-area">
                        {predictions.length > 0 && (
                            <ul className="w-[350px] mt-10 flex flex-col" id="list-area">
                                {predictions.map((pred, index) => (

                                    <li key={index}
                                        className=" inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white border border-gray-300 text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer">
                                        <div
                                            className="group flex justify-between w-full hover:text-indigo-600"> {pred.className}: <span
                                            className="inline-flex items-center py-1 px-2 rounded-full text-xs font-semibold transition-all duration-150 bg-gray-300 text-gray-700 group-hover:bg-indigo-600 group-hover:text-white">{(pred.probability * 100).toFixed(2)}%</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
        ;
}
