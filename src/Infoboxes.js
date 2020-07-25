import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import './Infoboxes.css';

export default function Infoboxes({ title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className="infobox__title" color="textSecondary" >{title}</Typography>
                {/* no.of cases */}
                <h2 className="infobox__cases">{cases}</h2>
                {/* Total */}
                <Typography className="infobox__total" color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    )
}
