import { LegendList, type LegendListRenderItemProps } from "@legendapp/list/react";
import { createContext, useCallback, useContext, useState } from "react";

type Item = {
    id: string;
};

type RecordValue = {
    label: string;
};

const initialItems: Item[] = Array.from({ length: 100 }, (_, index) => ({
    id: `item-${index}`,
}));

const initialRecords = new Map<string, RecordValue>(
    initialItems.map((item, index) => [item.id, { label: `Record ${index}` }]),
);

const RecordsContext = createContext<ReadonlyMap<string, RecordValue>>(initialRecords);

function RecordRow({ id }: { id: string }) {
    const records = useContext(RecordsContext);
    const record = records.get(id)!;

    return (
        <div className="row">
            <span>{record.label}</span>
            <small>{id}</small>
        </div>
    );
}

export function App() {
    const [items, setItems] = useState(initialItems);
    const [records, setRecords] = useState(initialRecords);
    const targetId = "item-2";

    const renderItem = useCallback(
        ({ item }: LegendListRenderItemProps<Item>) => <RecordRow id={item.id} />,
        [],
    );

    const removeVisibleRecord = () => {
        // Both updates are batched into one React event. Legend List receives data without
        // targetId at the same time that the external record disappears.
        setItems((current) => current.filter((item) => item.id !== targetId));
        setRecords((current) => {
            const next = new Map(current);
            next.delete(targetId);
            return next;
        });
    };

    return (
        <RecordsContext.Provider value={records}>
            <main>
                <button disabled={!records.has(targetId)} onClick={removeVisibleRecord} type="button">
                    Remove {targetId}
                </button>

                <div className="list-shell">
                    <LegendList
                        data={items}
                        estimatedItemSize={64}
                        keyExtractor={(item) => item.id}
                        recycleItems={false}
                        renderItem={renderItem}
                        style={{ height: 420 }}
                    />
                </div>
            </main>
        </RecordsContext.Provider>
    );
}
