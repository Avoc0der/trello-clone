import { useDragLayer } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { Column } from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        <Column id={draggedItem.id} text={draggedItem.text} isPreview />
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};