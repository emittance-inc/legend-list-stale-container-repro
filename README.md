# Legend List stale container reproduction

Minimal React DOM reproduction for a stale container render in `@legendapp/list@3.3.5`.

[Open the live reproduction](https://emittance-inc.github.io/legend-list-stale-container-repro/)

## Run

```sh
npm install
npm run dev
```

Open the printed local URL and click **Remove item-2**.

## Expected

The visible `item-2` row unmounts when it is removed from `LegendList` data.

## Actual

The stale row naturally throws an uncaught property-access error when it evaluates `record.label` after the external record has been deleted:

```text
Cannot read properties of undefined (reading 'label')
```

The app removes `item-2` from the list data and its normalized external record map in the same batched React update. The row observes the external store update before Legend List reconciles the container's previous item-key assignment, so the stale row renders against a record that no longer exists.

The reproduction uses only the public `@legendapp/list/react` API and reproduces with `recycleItems={false}`.
