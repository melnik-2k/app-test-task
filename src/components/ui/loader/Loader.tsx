import { FC } from "react";
import { CircularProgress } from "@mui/material";
import classes from "./Loader.module.css";

interface ILoaderProps {
    isLoading: boolean;
}

export const Loader: FC<ILoaderProps> = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className={classes.loader}>
                <CircularProgress />
            </div>
        );
    }
};
