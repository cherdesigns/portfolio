const Line = (props: any) => (
    <div
        style={{
            background: 'black',
            width: '100%',
            marginBottom: 8,
            marginTop: 8,
            height: 1,
            ...(props.style ?? {}),
        }}
        {...props}
    />
);

export default Line;
