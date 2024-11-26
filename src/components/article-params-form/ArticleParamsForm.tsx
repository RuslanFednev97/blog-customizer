import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { OptionType,fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState } from 'src/constants/articleProps'; 
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useCloseForm } from './hooks/useCloseForm';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void;
	applyStyles: () => void;
};


export const ArticleParamsForm = ({state, setState, resetStyles, applyStyles}: ArticleParamsFormProps) =>  {
	const [isOpen, setIsOpen] = useState(false);
	const containerClass = clsx(styles.container, {[styles.container_open]: isOpen });

	const toggleContainer = () => {
		setIsOpen(prev => !prev);
	};

	const updateFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const updateFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const updateFontColors = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const updateBackgroundColors = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const updateContentWidthArr = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const formRef =  useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleContainer,
		rootRef: formRef
	})

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleContainer} />
			<aside className={containerClass}>
				<form className={styles.form} ref={formRef} onSubmit={(e: FormEvent) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<Select
						selected={state.fontFamilyOption}
						onChange={updateFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={updateFontSize}
						title='размер шрифта'
						/>
					
					<Select
						selected={state.fontColor}
						onChange={updateFontColors}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator/>
					<Select
						selected={state.backgroundColor}
						onChange={updateBackgroundColors}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						onChange={updateContentWidthArr}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetStyles}/>
						<Button title='Применить' htmlType='submit' type='apply' onClick={applyStyles}/>
					</div>
				</form>
			</aside>
		</>
	);
};