import clsx from "clsx";

export default function Button(props) {
    const {className, outline, children, ...rest} = props;

    const classNames = clsx({
        "btn": true,
        "btn-default": !outline,
        "btn-outline": outline
    }, className);
  
    return (
        <>
            <button className={classNames} {...rest}>{children}</button>
        </>       
    )
}