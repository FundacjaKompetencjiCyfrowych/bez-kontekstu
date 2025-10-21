export default function titleCutWord(title: string, tailwindClass: string = "") {
    return title.split(" ").map((word, index) => (
        <h2 className={tailwindClass} key={index}>
            {word}
        </h2>
    ));
}


