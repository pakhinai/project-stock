import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {URL_IMG} from "../../Constants"

const useStyles = makeStyles({
    root : {
        display: "flex",
        flexWrap: "wrap",
    },
    card : {
        maxWidth: 300,
        textAlign: "center",
        margin: 10,
        borderRadius: 10,
        boxShadow: "4px 8px 8px rgba(224, 224, 224, 1)"
    }
})

export default function NikeUser(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <img src={`${URL_IMG}/image/${props.item.image}`}  />
                <div>
                    <p>{props.item.id}</p>
                    <p>{props.item.name}</p>
                    <p>{props.item.stock}</p>
                    <p>{props.item.price}</p>
                </div>
            </div>
        </div>
    )
}
