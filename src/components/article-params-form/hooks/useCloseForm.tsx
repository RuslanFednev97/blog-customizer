import { useEffect } from 'react';

type UseCloseForm = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseForm = ({ isOpen, onClose, rootRef }: UseCloseForm) => {
	useEffect(() => {
		// Закрытие по ESCAPE
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isOpen && onClose?.();
			}
		};

		//  Закрытие по клику вне окна
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};

		window.addEventListener('keydown', handleEsc);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleEsc);
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);
};
