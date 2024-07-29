export interface TableColumns {
    field:string,
    header:string,
    body?:React.FC<any>,
    sortable?:boolean,
    style?:React.CSSProperties,
}