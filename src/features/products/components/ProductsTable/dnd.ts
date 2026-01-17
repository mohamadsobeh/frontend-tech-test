import React from "react"

interface DnDContextType {
  draggingId: string | null
  setDraggingId: (id: string | null) => void
  columnOrder: string[]
  setColumnOrder: (order: string[]) => void
  dragOverColumnIdRef: React.MutableRefObject<string | null>
}

export function getDragHandlers(context: DnDContextType) {
  const { draggingId, setDraggingId, columnOrder, setColumnOrder, dragOverColumnIdRef } = context

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    setDraggingId(columnId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.preventDefault()
    dragOverColumnIdRef.current = columnId
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragLeave = () => {
    dragOverColumnIdRef.current = null
  }

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, dropColumnId: string) => {
    e.preventDefault()
    dragOverColumnIdRef.current = null

    if (!draggingId || draggingId === dropColumnId) {
      setDraggingId(null)
      return
    }

    // Reorder the columns
    const draggedIndex = columnOrder.indexOf(draggingId)
    const targetIndex = columnOrder.indexOf(dropColumnId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggingId(null)
      return
    }

    const newColumnOrder = [...columnOrder]
    newColumnOrder.splice(draggedIndex, 1)
    newColumnOrder.splice(targetIndex, 0, draggingId)

    setColumnOrder(newColumnOrder)
    setDraggingId(null)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    dragOverColumnIdRef.current = null
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  }
}

export function getDraggableHeaderProps(
  columnId: string,
  draggingId: string | null,
  handlers: ReturnType<typeof getDragHandlers>
) {
  return {
    draggable: true,
    onDragStart: (e: React.DragEvent<HTMLTableCellElement>) => handlers.handleDragStart(e, columnId),
    onDragOver: (e: React.DragEvent<HTMLTableCellElement>) => handlers.handleDragOver(e, columnId),
    onDragLeave: handlers.handleDragLeave,
    onDrop: (e: React.DragEvent<HTMLTableCellElement>) => handlers.handleDrop(e, columnId),
    onDragEnd: handlers.handleDragEnd,
    className: `select-none cursor-move transition-opacity ${
      draggingId === columnId ? "opacity-50" : ""
    } ${draggingId && draggingId !== columnId ? "opacity-70" : ""}`,
  }
}
