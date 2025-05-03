export type RoutesType = {
    [key: string]: RoutesListType;
}

export type RoutesListType = {
    tag: string | null;
    title: string | null;
    active: boolean;
}