import "./accordion.css";
function AccordionComponent({
    title,
    content,
    cat,
    titleClassNames = "",
    contentClassNames = "",
}: {
    title: string;
    content: React.ReactNode | JSX.Element;
    cat: string;
    titleClassNames?: string;
    contentClassNames?: string;
}) {
    const id = "accordion-" + cat;
    return (
        <div className="accordion relative">
            <input type="checkbox" id={id} className="click-effect" />
            <label htmlFor={id} className="py-3">
                <div className={`flex justify-between active:bg-light-gray ${titleClassNames}`}>
                    {title}
                    <em style={{ background: "url(/icons/expand.svg)" }} />
                </div>
            </label>
            <div>
                <div className={`${contentClassNames} overflow-auto`}>{content}</div>
            </div>
        </div>
    );
}

export default AccordionComponent;
