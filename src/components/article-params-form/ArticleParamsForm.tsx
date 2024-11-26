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
	resetStyles: () => void;
	applyStyles: (formState: typeof defaultArticleState) => void; 
};


export const ArticleParamsForm = ({resetStyles, applyStyles}: ArticleParamsFormProps) =>  {
	const [formState, setFormState] = useState(defaultArticleState); 
	const [isOpen, setIsOpen] = useState(false);
	const containerClass = clsx(styles.container, {[styles.container_open]: isOpen });

	const toggleContainer = () => {
		setIsOpen(prev => !prev);
	};

	const updateFontFamily = (value: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const updateFontSize = (value: OptionType) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const updateFontColors = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value });
	};

	const updateBackgroundColors = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value });
	};

	const updateContentWidthArr = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value });
	};

	const formRef =  useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleContainer,
		rootRef: formRef
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		applyStyles(formState); 
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleContainer} />
			<aside className={containerClass}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={updateFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption} 
						onChange={updateFontSize}
						title='размер шрифта'
						/>
					
					<Select
						selected={formState.fontColor} 
						onChange={updateFontColors}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator/>
					<Select
						selected={formState.backgroundColor}
						onChange={updateBackgroundColors}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={updateContentWidthArr}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetStyles}/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};